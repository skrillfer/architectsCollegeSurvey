import React from 'react';
import { Form, Upload, Input, Button, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { Collapse } from 'antd';

//const { Panel } = Collapse;

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

const layout = {
    layout: 'vertical'
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 18 },
  };


  const onFinish = values => {
    console.log('Success:', values);
    console.log(values.dpiFile[0].originFileObj);
    var formData = new FormData();
    formData.append("file", values.dpiFile[0].originFileObj);
    var request = new XMLHttpRequest();
    
    request.open("POST", "http://localhost:3100/saveFile");
    request.setRequestHeader("enctype", 'multipart/form-data');
    request.send(formData);
    request.onload = function(oEvent) {
        if (request.status === 200) {
        console.log("Uploaded!");
        } else {
        console.log(request);
        console.log("Error " + request.status + " occurred when trying to upload your file.<br>");
        }
    };
    

    

    /*fetch('http://localhost:3100/Survey',{
        method:'post',
        body: JSON.stringify({ "dpiFile": values.dpiFile[0].originFileObj}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    .catch(err => console.log(err))*/
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
const FormGeneric = () => {
    return (
       
       
        <Form
      {...layout}
      name="basic"
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
         <Collapse defaultActiveKey={['1']} >
            <Collapse.Panel header="Informacion Personal" key={1}>
                <Form.Item
                label="Primer nombre"
                name="firstName"
                rules={[{ required: true, message: 'Por favor ingrese su primer nombre!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Segundo nombre"
                    name="secondName"
                    rules={[{ required: false, message: '' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Otros nombres"
                    name="othersName"
                    rules={[{ required: false, message: '' }]}
                >
                    <Input />
                </Form.Item>
                <Divider dashed />

                <Form.Item
                    label="Primer Apellido"
                    name="lastName"
                    rules={[{ required: true, message: 'Por favor ingrese su primer apellido!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Segundo Apellido"
                    name="secondLastName"
                    rules={[{ required: false, message: '' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Apellido de Casado(a)"
                    name="surName"
                    rules={[{ required: false, message: '' }]}
                >
                    <Input />
                </Form.Item>

                <Divider dashed />
                <Form.Item
                    label="DPI"
                    name="dpi"
                    rules={[{ required: true, message: 'Por favor ingrese su dpi' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="NIT"
                    name="nit"
                    rules={[{ required: false, message: '' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Celular"
                    name="telephone"
                    rules={[{ required: true, message: 'Por favor ingrese su telefono' }]}
                >
                    <Input />
                </Form.Item>

                

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                    {
                        type: 'email',
                        message: 'El valor no es un E-mail valido!',
                    },
                    {
                        required: true,
                        message: 'Por favor ingrese su E-mail!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                
            </Collapse.Panel>
            <Collapse.Panel header="Documentos" key={2} >

                <Form.Item
                    name="dpiFile"
                    label="Documento DPI ambos lados"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Subir pdf con foto de ambos lados del dpi"
                    rules={[{ required: true, message: 'Por favor ingrese su dpi' }]}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> Click para subir
                    </Button>
                    </Upload>
                </Form.Item>

                {/*<Form.Item

                    name="passportFile"
                    label="Pasaporte en documento pdf"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Subir documento pdf pasaporte"
                    rules={[{ required: true, message: 'Por favor subir imagen de pasaporte en un archivo pdf' }]}
                >
                    <Upload  name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> Click para subir
                    </Button>
                    </Upload>
                </Form.Item>


                <Form.Item
                    name="collegiateFile"
                    label="Colegiado en documento pdf"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Subir pdf de la constancia de colegido"
                    rules={[{ required: true, message: 'Por favor suba su constancia de colegido' }]}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> Click para subir
                    </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="affidavitFile"
                    label="Documento Acta Notarial"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Subir document pdf del acta notarial"
                    rules={[{ required: true, message: 'Por favor suba documento de acta notarial' }]}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> Click para subir
                    </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="applicationLetterFile"
                    label="Documento Carta de Solicitud"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Descargue la Carta de Solicitud, luego subala."
                    rules={[{ required: true, message: 'Por favor suba su Carta de Solicitud' }]}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> Click para subir
                    </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="attachedFormFile"
                    label="Documento Anexo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Descargue el documento anexo, llenelo y subalo"
                    rules={[{ required: true, message: 'Por favor suba su documento anexo' }]}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> Click para subir
                    </Button>
                    </Upload>
                </Form.Item>
                */}
                
                

                
            </Collapse.Panel>
            <br/>
        
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
            Enviar Informacion
            </Button>
        </Form.Item>
        <br/><br/>
      </Collapse>

    </Form>
    );
}

export default FormGeneric;