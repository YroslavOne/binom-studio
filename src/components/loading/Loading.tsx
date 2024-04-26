import { LoadingOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

function Loading() {
  return (
    <Flex
      style={{ width: '100vw', height: '100vh' }}
      align={'center'}
      justify={'center'}
      vertical
    >
      <LoadingOutlined style={{ fontSize: '50px' }} />
    </Flex>
  );
}
export default Loading;
