export interface FolderProps {
  id: number;
  name: string;
  url: string;
  isOpen: boolean;
  passwords: {
    id: number;
    passName: string;
    pass: string;
    login: string;
    url: string;
  }[];
}

export const initialFolders: FolderProps[] = [
  {
    id: 1,
    name: "Folder 1",
    url: "",
    isOpen: false,
    passwords: [
      {
        id: 1,
        passName: "parol a",
        pass: "1234567",
        login: "",
        url: "https://www.site.com",
      },
      {
        id: 2,
        passName: "parol i",
        pass: "123456f",
        login: "",
        url: "https://www.site.com",
      },
      {
        id: 3,
        passName: "parol 89",
        pass: "123456f",
        login: "",
        url: "https://www.site.com",
      },
      {
        id: 4,
        passName: "parol vx",
        pass: "123456f",
        login: "",
        url: "https://www.site.com",
      },
      {
        id: 5,
        passName: "parol hjk",
        pass: "123456f",
        login: "",
        url: "https://www.site.com",
      },
    ],
  },
  {
    id: 2,
    name: "Folder 2",
    url: "",
    isOpen: false,
    passwords: [
      {
        id: 1,
        passName: "parol g",
        pass: "654321s",
        login: "",
        url: "https://www.site.com",
      },
      {
        id: 2,
        passName: "parol f",
        pass: "123456f",
        login: "",
        url: "https://www.site.com",
      },
    ],
  },
  {
    id: 3,
    name: "Folder 3",
    url: "",
    isOpen: false,
    passwords: [
      {
        id: 1,
        passName: "parol aws",
        pass: "89898989",
        login: "",
        url: "https://www.site.com",
      },
      {
        id: 2,
        passName: "parol wsaass",
        pass: "000000",
        login: "",
        url: "https://www.site.com",
      },
    ],
  },
];
