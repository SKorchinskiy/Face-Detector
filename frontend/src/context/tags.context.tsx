"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

export const TagsContext = createContext({
  selectedTags: [] as string[],
  toggleTag: (tag_name: string) => {},
  applyTags: () => [] as string[],
  cancelUpdate: () => {},
});

export default function TagsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [updatedTags, setUpdatedTags] = useState<string[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const stringifiedValues = params.get("tags");
    if (stringifiedValues) {
      const values = stringifiedValues.split(",");
      setSelectedTags(values);
      setUpdatedTags(values);
    } else {
      setSelectedTags([]);
      setUpdatedTags([]);
    }
  }, [searchParams]);

  const toggleTag = (tag_name: string) => {
    setUpdatedTags((prevState) => {
      const isIncluded = prevState.includes(tag_name);
      if (!isIncluded) {
        const newValues = [...prevState];
        newValues.push(tag_name);
        return newValues;
      }
      return [...prevState].filter((name) => name !== tag_name);
    });
  };

  const applyTags = () => {
    setSelectedTags(updatedTags);
    return updatedTags;
  };
  const cancelUpdate = () => setUpdatedTags(selectedTags);

  return (
    <TagsContext.Provider
      value={{ selectedTags, toggleTag, applyTags, cancelUpdate }}
    >
      {children}
    </TagsContext.Provider>
  );
}
