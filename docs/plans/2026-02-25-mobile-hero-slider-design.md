# Mobile Hero Slider Design

## Problem Statement
The `ProductSlider` component on the main page currently exhibits layout jumping on mobile devices. Because the product title and description text lengths differ between slides, the height of the text container changes on every slide transition. Since the product image on mobile is positioned directly below this text container, the image shifts up and down jarringly. This violates UI/UX guidelines which dictate that layout shifts (Content Jumping) should be avoided to provide a smooth user experience.

## Chosen Approach: Fixed Height Text Container
We will apply a minimum height to the text container targeted specifically at mobile viewports. By ensuring the height is predictable, the image below will always remain anchored at the same vertical position, resulting in smooth transitions between slides.

### Technical Details
1. **Target Container**: The `<div>` wrapping the Badges, Headline, Specs, and CTA Buttons (class `flex flex-col gap-6 lg:gap-8 text-left lg:col-span-4 z-20`).
2. **CSS Changes**: 
   - Add `min-h-[480px]` (or approximate required height depending on maximum content length) for mobile devices (`min-h-[450px] sm:min-h-[400px] lg:min-h-0`).
   - The exact minimum height will be determined to accommodate the longest possible product name and description combination in the slider.
3. **Responsive Considerations**: The `min-h` restriction will be disabled (`lg:min-h-0`) on large screens (desktop), where the layout shifts to a side-by-side grid, and natural heights won't cause the image to jump vertically since the image is in a separate column.

## Error Handling & Edge Cases
- **Extremely Long Text**: If a new product is added with an extensively long description that exceeds the minimum height, it will cause jumping again. To prevent this, we will also enforce a maximum line limit (`line-clamp-3` or `line-clamp-4`) on the description to ensure it never exceeds the height constraints.
- **Accessibility**: No changes to the semantic markup or interactive elements. Slide transitions will continue to be fully accessible.

## Implementation Steps
1. Add `min-h-[...px]` classes to the left content wrapper in `ProductSlider.tsx`.
2. Add a `line-clamp` class to the product description paragraph to safeguard against variable bounds.
3. Test layout behaviour using browser developer tools on mobile dimensions to dial in the exact `min-h` required without adding unnecessarily large gaps.
