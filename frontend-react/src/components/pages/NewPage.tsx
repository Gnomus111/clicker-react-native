const [data, setData] = React.useState<dataDto>(); // dataDto тип передаваемых / получаемых данных

const changeData = () => {
  let localData = data ? data : { id: 2, age: 30, name: 'Stas' };

  localData.name = 'Stas';
  localData.age = 31;

  if (localData.id) {
    editDataId(localData.id, localData)
      .then(response => {
        setData(response.data)
      })
      .catch(e => console.log(e));
  }
}

return <Box
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