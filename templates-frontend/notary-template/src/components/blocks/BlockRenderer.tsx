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
  switch (block.type) {
    case 'hero':
      return <HeroBlock block={block} />;
    case 'verified_credentials':
      return <VerifiedCredentialsBlock block={block} />;
    case 'services_list':
      return <ServicesListBlock block={block} />;
    case 'booking':
      return <BookingBlock block={block} notaryPageId={notaryPageId} />;
    case 'document_upload':
      return <DocumentUploadBlock block={block} notaryPageId={notaryPageId} />;
    case 'payment':
      return <PaymentBlock block={block} />;
    case 'faq':
      return <FAQBlock block={block} />;
    case 'testimonials':
      return <TestimonialsBlock block={block} />;
    case 'service_area':
      return <ServiceAreaBlock block={block} />;
    case 'esignature':
      return <ESignatureBlock block={block} />;
    case 'identity_verification':
      return <IdentityVerificationBlock block={block} />;
    case 'consent':
      return <ConsentBlock block={block} />;
    case 'contact_form':
      return <ContactFormBlock block={block} />;
    case 'content':
      return <ContentBlock block={block} />;
    case 'card_grid':
      return <CardGridBlock block={block} />;
    default:
      console.warn(`Unknown block type: ${(block as any).type}`);
      return null;
  }
};
