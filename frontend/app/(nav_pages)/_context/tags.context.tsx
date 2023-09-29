"use client";

import { useSearchParams } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

const initialValue = {
  selectedTags: [] as string[],
  toggleTag: (_: string) => {},
  applyTags: () => [] as string[],
  cancelUpdate: () => {},
};

export const TagsContext = createContext(initialValue);

export default function TagsProvider({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();
  const [updatedTags, setUpdatedTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
        return [...prevState].concat([tag_name]);
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
