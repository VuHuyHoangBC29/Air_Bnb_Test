import { Spin } from "antd";
import * as React from "react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./spinner.scss";
import { WrapperSpin } from "./style";
// import { WrapperSpin } from "./style";

interface Props {
  children: React.ReactNode;
}

export interface Loading {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<Loading>>;
}

//Cách 1: truyền state mặc định thông qua initialLoadingState
// const initialLoadingState: Loading = {
//   isLoading: false,
//   setIsLoading: (boolean) => {},
// };

// const LoadingContext = createContext<Loading>(initialLoadingState);

// const LoadingProvider: React.FC<Props> = ({ children }) => {
//   const [isLoading, setIsLoading] = useState<Loading>(initialLoadingState);

//   useEffect(() => {
//     if (isLoading.isLoading) {
//       document.getElementsByTagName("body")[0].style.overflow = "hidden";
//     } else {
//       document.getElementsByTagName("body")[0].style.overflow = "auto";
//     }
//   }, [isLoading.isLoading]);

//   return (
//     <LoadingContext.Provider value={{ ...isLoading, setIsLoading }}>
//       {isLoading.isLoading && (
//         <WrapperSpin viewHeight="100vh">
//           <Spin />
//         </WrapperSpin>
//       )}
//       {children}
//     </LoadingContext.Provider>
//   );
// };

// export { LoadingContext, LoadingProvider };



// Cách 2: truyền thẳng state mặc định vào createContext
const LoadingContext = createContext<Loading>({
  isLoading: false,
  setIsLoading: () => {},
});

const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<Loading>({
    isLoading: false,
    setIsLoading() {},
  });

  useEffect(() => {
    if (isLoading.isLoading) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }, [isLoading.isLoading]);

  return (
    <LoadingContext.Provider value={{ ...isLoading, setIsLoading }}>
      {isLoading.isLoading && (
        <WrapperSpin viewHeight="100vh">
          <Spin />
        </WrapperSpin>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };

// export interface ITodo {
//   id: number;
//   title: string;
//   description: string;
//   status: boolean;
// }
// export type TodoContextType = {
//   todos: ITodo[];
//   saveTodo: (todo: ITodo) => void;
//   updateTodo: (id: number) => void;
// };

// interface Props {
//   children: React.ReactNode;
// }

// export const TodoContext = React.createContext<TodoContextType | null>(null);

// const TodoProvider: React.FC<Props> = ({ children }) => {
//   const [todos, setTodos] = React.useState<ITodo[]>([
//     {
//       id: 1,
//       title: 'post 1',
//       description: 'this is a description',
//       status: false,
//     },
//     {
//       id: 2,
//       title: 'post 2',
//       description: 'this is a description',
//       status: true,
//     },
//   ]);
//   const saveTodo = (todo: ITodo) => {
//     const newTodo: ITodo = {
//       id: Math.random(), // not really unique - but fine for this example
//       title: todo.title,
//       description: todo.description,
//       status: false,
//     };
//     setTodos([...todos, newTodo]);
//   };
//   const updateTodo = (id: number) => {
//     todos.filter((todo: ITodo) => {
//       if (todo.id === id) {
//         todo.status = true;
//         setTodos([...todos]);
//       }
//     });
//   };
//   return <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>{children}</TodoContext.Provider>;
// };

// export default TodoProvider;
