import "./index.css";

interface DetailProps {
  name: string;
  id: number;
}

interface DetailModalProps {
  isOpen: boolean;
  remove: () => void;
  className: string;
  item: string;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  remove,
  className,
  item,
}) => {
  const details = [
    {
      id: 1,
      name: `Удалить ${item}`,
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${className} detailModalContainer`}>
      <div className='embed'></div>
      {details.map(({ id, name }: DetailProps, i) => {
        return (
          <button
            key={id + i}
            className='detail'
            onClick={e => {
              e.stopPropagation();
              if (id === 1) {
                remove();
              }
            }}>
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default DetailModal;
