<!-- BEGIN SYA INTEGRATION -->
## sya Integration

- Use the `sya` CLI for all task tracking; do not read `.sya/tasks/` directly.
- Start sessions with `sya prime`.
- Run `sya schema docs` for the full workflow and guard semantics.
- Find work: `sya ready`; claim: `sya claim <id>`.
- Move work: `sya move <id> <status>`; inspect options: `sya transitions <id>`.
- Record progress: `sya comment <id> -m "..."`.
- Finish allowed work: `sya close <id> --reason "..."`.
<!-- END SYA INTEGRATION -->
