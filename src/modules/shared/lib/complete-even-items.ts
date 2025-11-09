import { ProductSummary } from "@/shared/entities/products.entity";

export function completeEvenItems(
  items: (ProductSummary & { empty?: boolean })[],
  numColumns = 2
) {
  const numberOfFullRows = Math.floor(items.length / numColumns);

  let numberOfElementsLastRow = items.length - numberOfFullRows * numColumns;

  const dummyItem = items[items.length - 1];

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    items.push({
      ...dummyItem,
      id: `${dummyItem.id}-${numberOfElementsLastRow}`,
      empty: true,
    });
    numberOfElementsLastRow++;
  }

  return items;
}
