import React from 'react'
import { useEffect, useRef, useState } from "react";
import {
  Box,
  boxesIntersect,
  useSelectionContainer
} from "@air/react-drag-to-select";
import cx from 'classnames';

type Props = {
  data: string[][]
}

const Table = ({ data }: Props) => {
  const [selectionBox, setSelectionBox] = useState<Box>();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const selectableItems = useRef<Box[]>([]);
  const elementsContainerRef = useRef<HTMLTableSectionElement | null>(null);

  const { DragSelection } = useSelectionContainer({
    eventsElement: document.getElementById("root"),
    onSelectionChange: (box) => {
      const scrollAwareBox: Box = {
        ...box,
        top: box.top + window.scrollY,
        left: box.left + window.scrollX
      };

      setSelectionBox(scrollAwareBox);
      const indexesToSelect: number[] = [];
      selectableItems.current.forEach((item, index) => {
        if (boxesIntersect(scrollAwareBox, item)) {
          indexesToSelect.push(index);
        }
      });

      setSelectedIndexes(indexesToSelect);
    },
    onSelectionStart: () => {
      console.log('-------------------------')
      console.log('onSelectionStart')
      console.log('-------------------------')
      setSelectionBox(undefined);
      setSelectedIndexes([]);
    },
    onSelectionEnd: () => {
    },
    selectionProps: {
      style: {
        border: "2px dashed purple",
        borderRadius: 4,
        backgroundColor: "brown",
        opacity: 0.5
      }
    },
    isEnabled: true
  });

  useEffect(() => {
    if (elementsContainerRef.current) {
      Array.from(elementsContainerRef.current.children).forEach((item) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        selectableItems.current.push({
          left,
          top,
          width,
          height
        });
      });
    }
  }, []);

  return (
    <>
      <DragSelection />
      <div className='max-w-screen w-full'>
        <table className="max-w-screen overflow-x-auto block">
          <thead>
            <tr>
              {data[0]?.map((header, index) => (
                <th key={index} className="border px-4 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody ref={elementsContainerRef}>
            {data.slice(1).map((row, rowIndex) => (
              <tr data-testid={`grid-cell-${rowIndex}`} key={rowIndex}>
                {row.map((cell, index) => (
                  <td key={index} className={cx("border px-4 py-2", {
                    'bg-blue-100': selectedIndexes.includes(rowIndex)
                  })}>
                    <input defaultValue={cell} className="outline-none bg-transparent" />
                  </td>
                ))}
                <div
                  className={cx('w-32 border h-12 hover:border-r-blue-400 hover:border-b-blue-400 hover:border-t-blue-400 cursor-pointer', {
                    'bg-blue-100': selectedIndexes.includes(rowIndex)
                  })}
                >{rowIndex}</div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
