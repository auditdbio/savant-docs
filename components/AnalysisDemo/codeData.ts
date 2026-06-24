import { CodeBlock } from './AnalysisDemo';

export const codeData = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IPriceOracle {
  function getPrice() external view returns (uint256);
}

contract MinimalLending {
  address public owner;
  IERC20 public token;
  IPriceOracle public oracle;

  uint256 public constant MIN_COLLATERAL_RATIO = 150;   
  uint256 public constant LIQUIDATION_THRESHOLD = 110;    
  uint256 public constant INTEREST_RATE_PER_SECOND = 3170979198; 

  struct Loan {
    uint256 collateral; 
    uint256 principal; 
    uint256 startTime; 
  }
    
  mapping(address => Loan) public loans;
    
  modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
  }
    
  constructor(address _token, address _oracle) {
    owner = msg.sender;
    token = IERC20(_token);
    oracle = IPriceOracle(_oracle);
  }
    
  function depositLiquidity(uint256 amount) external onlyOwner {
    require(
      token.transferFrom(msg.sender, address(this), amount),
      "Transfer failed"
    );
  }
    
  function borrow(uint256 borrowAmount) external payable {
    require(msg.value > 0, "Collateral required");
    require(loans[msg.sender].principal == 0, "Existing loan exists");

    uint256 price = oracle.getPrice();
    uint256 collateralValue = (msg.value * price) / 1e18;

    require(
      collateralValue * 100 >= borrowAmount * MIN_COLLATERAL_RATIO,
      "Insufficient collateral"
    );

    loans[msg.sender] = Loan({
      collateral: msg.value,
      principal: borrowAmount,
      startTime: block.timestamp
    });

    require(
      token.transfer(msg.sender, borrowAmount),
      "Token transfer failed"
    );
  }
    
  function getCurrentDebt(address borrower) public view returns (uint256) {
    Loan memory loan = loans[borrower];
    if (loan.principal == 0) return 0;

    uint256 timeElapsed = block.timestamp - loan.startTime;
    uint256 scale = 1e18;

    uint256 x = INTEREST_RATE_PER_SECOND * timeElapsed / scale;
    uint256 x2 = (x * x) / scale;
    uint256 x3 = (x2 * x) / scale;

    uint256 expApprox = scale + x + (x2 / 2) + (x3 / 6);

    return (loan.principal * expApprox) / scale;
  }

  function repayLoan() external {
    Loan memory loan = loans[msg.sender];
    require(loan.principal > 0, "No active loan");
    uint256 debt = getCurrentDebt(msg.sender);
    uint256 collateral = loan.collateral;
    delete loans[msg.sender];

    require(
      token.transferFrom(msg.sender, address(this), debt),
      "Token transfer failed"
    );

    (bool success, ) = msg.sender.call{value: collateral}("");
    require(success, "ETH refund failed");
  }
    
  function isLiquidatable(address borrower) public view returns (bool) {
    Loan memory loan = loans[borrower];
    if (loan.principal == 0) return false;
    uint256 debt = getCurrentDebt(borrower);
    uint256 price = oracle.getPrice();
    uint256 collateralValue = (loan.collateral * price) / 1e18;

    return (debt * 100) >= (collateralValue * LIQUIDATION_THRESHOLD);
  }
    
  function liquidate(address borrower) external {
    require(isLiquidatable(borrower), "Loan not liquidatable");
    Loan memory loan = loans[borrower];
    uint256 debt = getCurrentDebt(borrower);
    uint256 collateral = loan.collateral;
    delete loans[borrower];
    require(
        token.transferFrom(msg.sender, address(this), debt),
        "Token transfer failed"
    );
    (bool success, ) = msg.sender.call{value: collateral}("");
    require(success, "Collateral transfer failed");
  }
}
`.trim();


export const blocksData: CodeBlock[] = [
    {
      id: 0,
      startLine: 27,
      endLine: 30,
      isVulnerable: false,
      analysisText: {
        processing: "Verify onlyOwner modifier restricts access to the EO designated as protocol owner.\nFuzz allowance paths – simulate insufficient approval to ensure transferFrom reverts as expected.\nTrack storage writes and confirm no state is mutated after the external ERC-20 call (reentrancy safety).\nInspect for missing event emission; mark as informational finding if absent.\nTest with deflationary tokens to detect balance discrepancies – require still guards against short transfers.",
        summary: "`depositLiquidity` is gated by `onlyOwner`, performs a single `transferFrom` guarded by `require` and makes no external ETH calls. State is not modified after the external call, so typical reentrancy and privilege-escalation vectors are absent. No security-critical findings in this slice.",
      },
    },
    {
      id: 1,
      startLine: 38,
      endLine: 43,
      isVulnerable: false,
      analysisText: {
        processing: "Assert collateral requirement – fuzz msg.value including 0 to confirm revert path.\nEnforce single active loan – read loans mapping, expect zero principal for new borrowers.\nFetch oracle price; simulate oracle returning extreme values to observe overflow or underflow.\nCompute (msg.value * price) / 1e18; verify precision and saturation at uint256 max.\nEvaluate MIN_COLLATERAL_RATIO branch coverage via symbolic execution – all execution paths reached.",
        summary: "The code correctly rejects zero-collateral borrow attempts (`msg.value > 0`) and ensures a borrower has no existing loan. Price is fetched from the oracle and collateral value computed. At this stage logic is coherent and no direct vulnerability is observed.",
      },
    },
    {
      id: 2,
      startLine: 45,
      endLine: 67,
      isVulnerable: true,
      analysisText: {
        processing: "Simulate standard borrow with positive borrowAmount and adequate collateral.\nSymbolically test borrowAmount == 0 edge case – observe loan struct persisted with principal 0.\nTrace ERC-20 transfer call for zero value; compliant tokens return true, masking issue.\nPropagate state to repayLoan – require on principal > 0 blocks collateral retrieval.\nConclude collateral becomes permanently locked; mark severity as High.",
        summary: "The function records a new loan and disburses ERC-20 tokens to the borrower. Absence of a `borrowAmount > 0` guard allows creation of zero-principal loans that cannot be repaid later, permanently locking collateral.",
        vulnerability: "Locked collateral via zero-amount borrow: `borrow` stores a `Loan` with `principal = 0` when `borrowAmount` is zero. `repayLoan` rejects such loans (`require(loan.principal > 0)`), so the user's ETH is unrecoverable. Attack is trivial – call `borrow(0)` with ETH.",
        remediation: "Add an explicit check at the top of `borrow`: `require(borrowAmount > 0, \"Borrow amount must be positive\");` to forbid zero-principal loans.",
      },
    },
    {
      id: 3,
      startLine: 69,
      endLine: 83,
      isVulnerable: true,
      analysisText: {
        processing: "Inspect INTEREST_RATE_PER_SECOND scaling (1e18) and compare with target APR.\nCompute x, x², x³ terms for 30-day interval using 256-bit math – detect truncation to zero.\nCross-validate against double-precision python model; error > 99%.\nEvaluate impact on debt growth, liquidation timing, and protocol revenue.\nDocument precision bug and recommend single-division strategy.",
        summary: "`getCurrentDebt` approximates `e^{rt}` via first-order Taylor terms but prematurely divides by `scale` (1e18). For realistic durations, `x`, `x2`, `x3` collapse to zero due to integer truncation, leading to near-zero interest.",
        vulnerability: "Incorrect interest due to integer truncation: the scaling strategy causes `x`, `x²`, `x³` to round down to zero unless the loan lasts decades, eliminating accrued interest, starving LP revenue, and weakening liquidation math.",
        remediation: "Defer division until after multiplications: compute `val_rTs = INTEREST_RATE_PER_SECOND * timeElapsed` (already scaled), then build higher-order terms before a single division step as illustrated in the audit report. This preserves precision while keeping gas low.",
      },
    },
    {
      id: 4,
      startLine: 85,
      endLine: 99,
      isVulnerable: false,
      analysisText: {
        processing: "Confirm caller owns an active loan -  loans[msg.sender].principal != 0.\nCalculate dynamic debt via getCurrentDebt; integrate earlier interest bug context.\nDelete loan state before any external token or ETH transfers (checks-effects-interactions).\nValidate ERC-20 pull pattern with transferFrom; ensure allowance >= debt.\nExecute ETH refund via call and assert success flag; attempt reentrant callback – state already cleared so safe.",
        summary: "The function deletes loan state before external transfers (`token.transferFrom` and ETH refund), mitigating reentrancy. The optimistic ETH send is wrapped in low-level `call` but guarded by success check. Potential gas-cost griefing via failing token transfer is acknowledged but acceptable under ERC-20 standard. No exploitable flaw detected in this snippet.",
      },
    },
    {
      id: 5,
      startLine: 101,
      endLine: 109,
      isVulnerable: false,
      analysisText: {
        processing: "Short-circuit when principal == 0 to avoid unnecessary oracle read.\nRecalculate debt with getCurrentDebt and observe precision constraints.\nFetch price from oracle; fuzz with low/high extremes to detect overflow.\nCompute collateralValue and evaluate LIQUIDATION_THRESHOLD comparison.\nExhaustively test using Echidna to ensure no false liquidations under realistic volatility.",
        summary: "`isLiquidatable` checks if debt exceeds `LIQUIDATION_THRESHOLD` percent of collateral value. The math is straightforward and resists overflow under 256-bit bounds. Economic parameters (150 → 110) is reasonable. No direct bug in this view.",
      },
    },
    {
      id: 6,
      startLine: 111,
      endLine: 123,
      isVulnerable: true,
      analysisText: {
        processing: "Invoke isLiquidatable to gate execution; confirm same math branch as analysed earlier.\nCopy loan data into memory and delete mapping entry pre-external calls (good).\nRequire transferFrom from liquidator – compute capital outlay >= debt.\nForward full collateral to liquidator; benchmark economic result across price ranges.\nMonte-Carlo simulate liquidation incentives – 100% scenarios show negative ROI; classify as critical economic flaw.",
        summary: "`liquidate` extracts full debt from the liquidator while returning only the borrower's collateral. Because `isLiquidatable` triggers when debt ≥ 110 % of collateral value, the liquidator is guaranteed to overpay and incur a loss, making the function economically non-viable.",
        vulnerability: "Forced unprofitable liquidations: liquidation requires paying ≥ debt (≥ 110 % of collateral value) to receive collateral worth less, disincentivising liquidators and risking protocol insolvency.",
        remediation: "Redesign payout maths to ensure positive expected value – e.g., let liquidators acquire collateral at a discount (`<= 95 %` of collateral value) or receive protocol fee rewards. Adjust `LIQUIDATION_THRESHOLD` in tandem to preserve solvency guarantees.",
      },
    },
  ];
  