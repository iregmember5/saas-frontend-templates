import React from 'react';
import type { NotaryBlock } from '../../types/wagtail';
import { HeroBlock } from './HeroBlock';
import { VerifiedCredentialsBlock } from './VerifiedCredentialsBlock';
import { ServicesListBlock } from './ServicesListBlock';
import { BookingBlock } from './BookingBlock';
import { DocumentUploadBlock } from './DocumentUploadBlock';
import { PaymentBlock } from './PaymentBlock';
import { FAQBlock } from './FAQBlock';
import {
  TestimonialsBlock,
  ServiceAreaBlock,
  ESignatureBlock,
  IdentityVerificationBlock,
  ConsentBlock,
  ContactFormBlock,
  ContentBlock,
} from './AdditionalBlocks';
import { CardGridBlock } from './CardGridBlock';

interface BlockRendererProps {
  block: NotaryBlock;
  notaryPageId: number;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, notaryPageId }) => {
  const blockId = block.id;
  
  switch (block.type) {
    case 'hero':
      return <div id={blockId}><HeroBlock block={block} /></div>;
    case 'verified_credentials':
      return <div id={blockId}><VerifiedCredentialsBlock block={block} /></div>;
    case 'services_list':
      return <div id={blockId}><ServicesListBlock block={block} /></div>;
    case 'booking':
      return <div id={blockId}><BookingBlock block={block} notaryPageId={notaryPageId} /></div>;
    case 'document_upload':
      return <div id={blockId}><DocumentUploadBlock block={block} notaryPageId={notaryPageId} /></div>;
    case 'payment':
      return <div id={blockId}><PaymentBlock block={block} /></div>;
    case 'faq':
      return <div id={blockId}><FAQBlock block={block} /></div>;
    case 'testimonials':
      return <div id={blockId}><TestimonialsBlock block={block} /></div>;
    case 'service_area':
      return <div id={blockId}><ServiceAreaBlock block={block} /></div>;
    case 'esignature':
      return <div id={blockId}><ESignatureBlock block={block} /></div>;
    case 'identity_verification':
      return <div id={blockId}><IdentityVerificationBlock block={block} /></div>;
    case 'consent':
      return <div id={blockId}><ConsentBlock block={block} /></div>;
    case 'contact_form':
      return <div id={blockId}><ContactFormBlock block={block} /></div>;
    case 'content':
      return <div id={blockId}><ContentBlock block={block} /></div>;
    case 'card_grid':
      return <div id={blockId}><CardGridBlock block={block} /></div>;
    default:
      console.warn(`Unknown block type: ${(block as any).type}`);
      return null;
  }
};
