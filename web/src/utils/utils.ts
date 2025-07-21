export const removeOption = async (category: string, pick: string): Promise<boolean> => {
    const respsone = await fetch(
      `http://127.0.0.1:5000/categories/${category}/remove/${pick}`,
      {
        method: "DELETE",
      }
    );
    if (!respsone.ok) {
      console.warn(`Failed to remove item ${pick}`);
      return false;
    }
    return true
}