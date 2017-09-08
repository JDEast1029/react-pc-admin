/**
 * 模拟数据
 */
import Mock from 'mockjs';

Mock.setup({timeout: '1200-2600'});
const baseUrl = 'https://jdeast1029.github.io/react-pc-admin';

const data = Mock.mock('/login', {
	data: {
		name: 'east'
	}
});

export default data;
