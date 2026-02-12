import { SetStateAction, useEffect, useState } from "react";
import { Box, Button } from "@mui/material"; // Предполагается использование MUI
import { editDataId } from "../../api/controllers/Common-controller"; // Добавьте импорт функции editDataId

// Определение интерфейса для типа данных
interface DataDto {
  id?: number;
  age?: number;
  name?: string;
}

const YourComponent: React.FC = () => {
  const [data, setData] = useState<DataDto | undefined>();

  // Если нужно загрузить данные при монтировании
  useEffect(() => {
    // Пример загрузки начальных данных
    // getCommon()
    //   .then(response => setData(response.data))
    //   .catch(e => console.log(e));
  }, []);

  const changeData = () => {
    // Создаем копию данных или используем дефолтные значения
    const localData = data 
      ? { ...data } 
      : { id: 2, age: 30, name: 'Stas' };

    // Обновляем поля
    localData.name = 'Stas';
    localData.age = 31;

    // Проверяем наличие id
    if (localData.id) {
      editDataId(localData.id, localData)
        .then((response: { data: SetStateAction<DataDto | undefined>; }) => {
          setData(response.data);
        })
        .catch((e: any) => console.log(e));
    }
  }

  return (
    <Box
      sx={{
        width: '900px',
        m: '0 auto'
      }}
    >
      <ul>
        <li>id: {data?.id}</li>
        <li>name: {data?.name}</li>
        <li>age: {data?.age}</li>
      </ul>
      <Button
        onClick={changeData}
        variant='contained'
        color='error'
      >
        Изменить данные
      </Button>
    </Box>
  );
}

export default YourComponent;