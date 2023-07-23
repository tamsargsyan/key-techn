export interface FolderProps {
  id: number;
  name: string;
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
    isOpen: false,
    passwords: [
      {
        id: 1,
        passName: "parol a",
        pass: "1234567",
        login: "user1",
        url: "https://www.site.com",
      },
      {
        id: 2,
        passName: "parol i",
        pass: "123456f",
        login: "user2",
        url: "https://www.site.com",
      },
      {
        id: 3,
        passName: "parol 89",
        pass: "123456f",
        login: "user3",
        url: "https://www.site.com",
      },
      {
        id: 4,
        passName: "parol vx",
        pass: "123456f",
        login: "menq123",
        url: "https://www.site.com",
      },
      {
        id: 5,
        passName: "parol hjk",
        pass: "123456f",
        login: "user4",
        url: "https://www.site.com",
      },
    ],
  },
  {
    id: 2,
    name: "Folder 2",
    isOpen: false,
    passwords: [
      {
        id: 1,
        passName: "parol g",
        pass: "654321s",
        login: "user6",
        url: "https://www.site.com",
      },
      {
        id: 2,
        passName: "parol f",
        pass: "123456f",
        login: "user7",
        url: "https://www.site.com",
      },
    ],
  },
  {
    id: 3,
    name: "Folder 3",
    isOpen: false,
    passwords: [
      {
        id: 1,
        passName: "parol aws",
        pass: "89898989",
        login: "user7",
        url: "https://www.site.com",
      },
      {
        id: 2,
        passName: "parol wsaass",
        pass: "000000",
        login: "ki234",
        url: "https://www.site.com",
      },
    ],
  },
];
