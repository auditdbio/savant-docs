import React from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { DISCORD_URL, DISCORD_COMMUNITY_NAME } from '../../config/constants';

export default function FooterWrapper() {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to={useBaseUrl('/imprint')} className="text-gray-500 hover:text-secondary">
                  Imprint
                </Link>
              </li>
              <li>
                <a href="mailto:hello@savant.chat" className="text-gray-500 hover:text-secondary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to={useBaseUrl('/terms-of-service')} className="text-gray-500 hover:text-secondary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to={useBaseUrl('/privacy-policy')} className="text-gray-500 hover:text-secondary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={useBaseUrl('/cookie-policy')} className="text-gray-500 hover:text-secondary">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to={useBaseUrl('/refund-policy')} className="text-gray-500 hover:text-secondary">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link to={useBaseUrl('/pricing')} className="text-gray-500 hover:text-secondary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">Contact</h3>
            <p className="text-gray-500">
              Have questions or want to learn more? Join our 
              <a href={DISCORD_URL} className="text-secondary hover:text-secondary-hover" target="_blank" rel="noopener noreferrer"> {DISCORD_COMMUNITY_NAME}</a>
              {' '}on Discord!
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Novel Codes DMCC. All rights reserved.
          </p>
          <div className="flex justify-center items-center mt-4">
            <img src={useBaseUrl('/img/visa_mastercard_unionpay.jpg')} alt="Visa, Mastercard, UnionPay" className="h-4 mr-2" />
            <img src={useBaseUrl('/img/amex.png')} alt="American Express" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
} 
