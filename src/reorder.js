const reorder = (list, startIndex, endIndex) => {
  const result1 = Array.from(list);
  const [removed] = result1.splice(startIndex, 1);
  result1.splice(endIndex, 0, removed);

  return result1;
};

export default reorder;

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
  const current = [...quoteMap[source.droppableId]];
  const next = [...quoteMap[destination.droppableId]];
  const target = current[source.index];

  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered
    };
    return {
      quoteMap: result
    };
  }


  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);

  const result2 = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };

  return {
    quoteMap: result2
  };
};
