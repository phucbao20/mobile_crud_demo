
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useDeletePostMutation, useGetPostsQuery } from '../Product/product.service';
import { cancelEditPost, startEditPost } from '../Product/product.slice';
import { Fragment } from 'react';



export default function HomeScreen() {

  // console.log(listProducts);
  //isLoading là dành cho lần fetch đầu tiên
  //isFetching là cho mỗi lần gọi API
  const { data, isLoading, isFetching } = useGetPostsQuery()
  const [deletePost] = useDeletePostMutation()
  const distpath = useDispatch()
  const startEdit = (id: string) => {
    distpath(startEditPost(id))
  }

  const startCreate = () => {
    distpath(cancelEditPost())
  }

  const handlDelete = (id: string) => {
    deletePost(id)
  }

  return (
    <View className='bg-white w-screen h-screen'>
      <View className='px-[30] pt-[50]'>
        <View className='px-[12] py-[10] font-bold bg-blue-600 rounded-lg'>
          <Text className=' text-2xl text-white '>Product</Text>
        </View>
        <View className='!pt-[10]'>
          <View className='pl-52'>
            <Button className='bg-green-700 w-40' mode="contained"> <Link  onPress={() => startCreate()} href="./createProduct">Create</Link> </Button>
          </View>
          <DataTable className='w-full h-full'>
            <DataTable.Header>
              <DataTable.Title >STT</DataTable.Title>
              <DataTable.Title numeric>Name</DataTable.Title>
              <DataTable.Title numeric>Brand</DataTable.Title>
              <DataTable.Title numeric>Date</DataTable.Title>
              <DataTable.Title numeric>Edit</DataTable.Title>
              <DataTable.Title numeric>Delete</DataTable.Title>
            </DataTable.Header>
            {isFetching && (
              <Fragment>

              </Fragment>
            )}
            {!isFetching && data?.map((product, index) => (
              <DataTable.Row key={product.id}>
                <DataTable.Cell >{index + 1}</DataTable.Cell>
                <DataTable.Cell >{product.name}</DataTable.Cell>
                <DataTable.Cell >{product.brand}</DataTable.Cell>
                <DataTable.Cell >{product.date}</DataTable.Cell>
                <DataTable.Cell >
                  <Link onPress={() => startEdit(product.id)} href={'./createProduct'}>
                    Edit
                  </Link>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    mode="contained"
                    onPress={() => handlDelete(product.id)}
                    compact
                  >
                    Delete
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </View>

      {/* <Link href="./demo-route" style ={{color : 'blue'}}>Go to DemoRoute</Link> */}
    </View>
  );
}

