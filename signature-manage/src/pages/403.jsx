import { Button, Result } from 'antd';
import React from 'react';
import router from 'umi/router'; 

const NoFoundPage = () => (
  <Result
    status="403"
    title="403"
    subTitle="没有权限访问该页面"
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        回到首页
      </Button>
    }
  ></Result>
);

export default NoFoundPage;
