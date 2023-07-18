import React, { useRef } from "react";
import "./index.css";

interface DetailProps {
  name: string;
  id: number;
}

interface DetailModalProps {
  isOpen: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen }) => {
  const details = [
    {
      id: 1,
      name: "Удалить папку",
    },
    {
      id: 2,
      name: "Добавить подраздел",
    },
    {
      id: 3,
      name: "Добавить пароль",
    },
    {
      id: 4,
      name: "Добавить в избранное",
    },
  ];
  const detailsModalRef = useRef<HTMLDivElement>(null);
  if (!isOpen) {
    return null;
  }

  return (
    <div className='detailModalContainer' ref={detailsModalRef}>
      <div className='embed'></div>
      {details.map(({ id, name }: DetailProps, i) => {
        return (
          <div key={id + i} className='detail'>
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default DetailModal;
