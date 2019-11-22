
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

import { uploadApk } from '../../services/apps'


@Form.create()
class Android extends React.Component {

    constructor() {
        super()
        this.state = {
            fileList: [],// ipa文件列表
            uploading: false,
        };
    }

    //上传提交
    handleUpload = () => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { fileList } = this.state;
                const formData = new FormData();
                formData.append('file', fileList[0]);

                this.setState({
                    uploading: true,
                });

                let { data: res } = await uploadApk(formData, values.uploadAddress);
                if (res.code === 1) {
                    this.props.form.resetFields();
                    this.setState({
                        fileList: [],
                        uploading: false,
                    });
                    message.success(res.msg);
                } else {
                    this.setState({
                        uploading: false,
                    });
					message.error(res.msg);
                }
            }
        });


    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { uploading, fileList } = this.state;
        const uploadDraggerStyle = { display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' };

        // 上传 apk 文件配置
        const apkProps = {
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
                const isIpa = file.name.endsWith('.apk')
                if (!isIpa) {
                    message.error('请选择 apk 文件!');
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


        return (
            <div>
                <Card bordered={false}>
                    <Form.Item label="安卓APP下载地址">
                        {
                            getFieldDecorator('uploadAddress', {
                                rules: [
                                    {
                                        required: true, message: '下载地址必填'
                                    }
                                ]
                            })(<Input
                                placeholder="请输入安卓APP下载地址"
                                autoSize={{ minRows: 6, maxRows: 12 }}
                            />)
                        }
                    </Form.Item>

                    <Form.Item label="安卓APP上传">
                        {
                            getFieldDecorator('file', {
                                rules: [
                                    {
                                        required: true, message: ''
                                    }
                                ]
                            })(<Upload.Dragger
                                {...apkProps}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="upload" />
                                </p>
                                <p>点击或拖拽选择 apk 文件</p>
                            </Upload.Dragger>)
                        }

                    </Form.Item>

                    <Button
                        type="primary"
                        onClick={this.handleUpload}
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

export default Android;