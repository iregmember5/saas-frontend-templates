import React from "react";
import type { DynamicContentBlock, Theme } from "../../../types/features-page";
import { CardGridBlock } from "./blocks/CardGridBlock";
import { DynamicListBlock } from "./blocks/DynamicListBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { RichTextBlock } from "./blocks/RichTextBlock";
import { CTABlock } from "./blocks/CTABlock";
import { BlockquoteBlock } from "./blocks/BlockquoteBlock";
import { ProblemSolutionBlock } from "./blocks/ProblemSolutionBlock";
import { PricingWidgetBlock } from "./blocks/PricingWidgetBlock";
import { getFullImageUrl } from "../utils/imageUtils";

interface DynamicContentRendererProps {
  block: DynamicContentBlock;
  theme: Theme;
}

export const DynamicContentRenderer: React.FC<DynamicContentRendererProps> = ({
  block,
  theme,
}) => {
  const renderers = {
    feature_grid: CardGridBlock,
    card_grid: CardGridBlock,
    feature_list: DynamicListBlock,
    dynamic_list: DynamicListBlock,
    feature_demo: VideoBlock,
    video: VideoBlock,
    technical_specs: RichTextBlock,
    rich_text: RichTextBlock,
    integration_cards: CTABlock,
    cta: CTABlock,
    testimonial_quotes: BlockquoteBlock,
    blockquote: BlockquoteBlock,
    problem_solution: ProblemSolutionBlock,
    pricing_widget: PricingWidgetBlock,
  };

  const BlockComponent = renderers[block.type as keyof typeof renderers];

  if (!BlockComponent) {
    console.warn(`No renderer found for block type: ${block.type}`);
    return null;
  }

  try {
    return (
      <BlockComponent
        value={block.value}
        theme={theme}
        getFullImageUrl={getFullImageUrl}
      />
    );
  } catch (error) {
    console.error(`Error rendering block ${block.type}:`, error);
    return null;
  }
};
