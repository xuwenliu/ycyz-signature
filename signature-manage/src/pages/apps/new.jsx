
import React from 'react'
import {
	Card,
	Upload,
	Input,
	Button,
	Icon,
	message,
	Form
} from 'antd';

import { uploadApp } from '../../services/apps'
import router from 'umi/router'


@Form.create()
class New extends React.Component {

	constructor() {
		super()
		this.state = {
			fileList: [],// ipa文件列表
			uploading: false,
			imgFileList: [], // 图片列表
		};
	}

	//上传提交
	handleUpload = () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				const { fileList, imgFileList } = this.state;
				const formData = new FormData();
				formData.append('file', fileList[0]);
				formData.append('files', imgFileList);

				this.setState({
					uploading: true,
				});

				let { data: res } = await uploadApp(formData, values.summary);
				if (res.code === 1) {
					this.setState({
						fileList: [],
						imgFileList: [],
						uploading: false,
					});
					message.success(res.msg);
					router.goBack();
				} else {
					this.setState({
						uploading: false,
					});
					message.error(res.msg);
				}

			}
		});


	};

	validateJpgOrPng = (file) => {
		return file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
	}

	validateImgSize = (file) => {
		return file.size / 1024 / 1024 < 1;
	}


	render() {
		const { getFieldDecorator } = this.props.form;
		const { uploading, fileList, imgFileList } = this.state;
		const uploadDraggerStyle = { display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' };

		// 上传 ipa 文件配置
		const ipaProps = {
			style: uploadDraggerStyle,
			onRemove: file => {
				this.setState(state => {
					const index = state.fileList.indexOf(file);
					const newFileList = state.fileList.slice();
					newFileList.splice(index, 1);
					return {
						fileList: newFileList,
					};
				});
			},
			beforeUpload: file => {
				const isIpa = file.name.endsWith('.ipa')
				if (!isIpa) {
					message.error('请选择 ipa 文件!');
					this.setState(state => ({
						fileList: [],
					}));
					return false
				}
				this.setState(state => ({
					fileList: [file],
				}));
				return false;
			},
			fileList,

		};

		//上传 图片 文件配置
		const uploadImageProps = {
			fileList: this.state.imgFileList,
			listType: 'picture',
			multiple: true,
			style: uploadDraggerStyle,
			showUploadList: {
				showRemoveIcon: true,
				showPreviewIcon: false,
				showDownloadIcon: false,
			},
			beforeUpload: file => {
				if (!this.validateJpgOrPng(file)) {
					message.error('请选择jpg/png格式图片');
					return false;
				}
				if (!this.validateImgSize(file)) {
					message.error('图片大小不能超过1MB');
					return false;
				}
				return false;
			},

			onChange: ({ fileList }) => {
				fileList = fileList.filter(file => this.validateJpgOrPng(file) && this.validateImgSize(file));

				if (fileList.length > 6) {
					message.error('最多只能上传6张图片');
				}
				//只能上传6张
				fileList = fileList.slice(0, 6);
				console.log(fileList)
				this.setState({ imgFileList: fileList });
			},
			onRemove: (file) => {
				this.setState(state => {
					const index = state.imgFileList.indexOf(file);
					const newFileList = state.imgFileList.slice();
					newFileList.splice(index, 1);
					return {
						imgFileList: newFileList,
					};
				});
			}

		}

		return (
			<div>
				<Card bordered={false}>
					<h3>上传文件</h3>
					<Upload.Dragger
						{...ipaProps}
					>
						<p className="ant-upload-drag-icon">
							<Icon type="upload" />
						</p>
						<p>点击或拖拽选择 ipa 文件</p>
					</Upload.Dragger>

					<h3 style={{ marginTop: 20 }}>应用描述</h3>
					<Form.Item>
						{
							getFieldDecorator('summary', {
								rules: [
									{
										max: 100, message: '最多输入100字'
									}
								]
							})(<Input.TextArea
								placeholder="最多输入100字"
								autoSize={{ minRows: 6, maxRows: 12 }}
							/>)
						}
					</Form.Item>


					<h3 style={{ marginTop: 20 }}>应用截图</h3>
					<Upload.Dragger
						{...uploadImageProps}
					>
						<p className="ant-upload-drag-icon">
							<Icon type="upload" />
						</p>
						<p>只能上传jpg/png文件，且不超过1M，最多传6张图片</p>
					</Upload.Dragger>

					<Button
						type="primary"
						onClick={this.handleUpload}
						// disabled={fileList.length === 0 || imgFileList.length === 0}
						disabled={fileList.length === 0}
						loading={uploading}
						style={{ marginTop: 16 }}
						block
						size="large"
					>
						{uploading ? '上传中...' : '上传'}
					</Button>
				</Card>
			</div>
		);
	}
}

export default New;