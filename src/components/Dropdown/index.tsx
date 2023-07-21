import DOWN_ICON from "../../assets/icons/down.svg";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space } from "antd";

interface DropdownComponentProps {
  name: string;
}

const handleMenuClick: MenuProps["onClick"] = e => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const items: MenuProps["items"] = [
  {
    label: "Полный",
    key: "1",
  },
  {
    label: "Чтение",
    key: "2",
  },
  {
    label: "Пусто",
    key: "3",
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const DropdownComponent: React.FC<DropdownComponentProps> = ({ name }) => {
  return (
    <Dropdown menu={menuProps} trigger={["click"]}>
      <Button>
        <Space>
          {name}
          <img src={DOWN_ICON} alt='Down' />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropdownComponent;
