export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getIniitCollectionModels = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalaizCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElements: (element: T) => K
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = getIniitCollectionModels();
  elements.forEach((el) => {
    const id = getKeyForElements(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });
  return collection;
};

export const linearizedCollection = <K extends string | number, T>(
  elements: CollectionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el]);
