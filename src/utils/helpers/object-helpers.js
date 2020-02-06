export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        return (u[objPropName] === itemId ? { ...u, ...newObjProps } : u);
    });
};