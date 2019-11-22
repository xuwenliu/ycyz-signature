import React from 'react'

import {
  Row,
  Col,
  Layout,
} from "antd";
const { Footer, Content } = Layout;

export default class AuthLayout extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
        <Content>
          <Row type="flex" align="middle" justify="center" style={{ minHeight: "100vh" }}>
            <Col xs={{ span: 20 }} sm={{ span: 12 }} md={{ span: 10 }} lg={{ span: 6 }}>
              {this.props.children}
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2019 Created by Meowah</Footer>
      </Layout>
    )
  }
}