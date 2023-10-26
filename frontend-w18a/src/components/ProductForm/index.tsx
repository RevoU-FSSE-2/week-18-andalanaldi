// import { Button, Card, Input, Select, Typography } from "antd"
// import { useFormik } from "formik"
// import { Category, CategoryForm as CategoryFormProps } from "../../types"
// import { initialValues, validationSchema } from "./productFormSchema"

// interface Props {
//     onSubmit: (values: CategoryFormProps) => void
//     category?: Category
// }

// const CategoryForm = ({ onSubmit, category } : Props) => {

//     const handleSubmit = (values: CategoryFormProps) => {
//         onSubmit(values)
//     }

//     const formMik = useFormik({
//         initialValues: category ?? initialValues,
//         onSubmit: handleSubmit,
//         validationSchema: validationSchema
//     })

//     const statusOptions = [
//         { value: true, label: 'Active' },
//         { value: false, label: 'Inactive' },
//     ];

//     return (
//         <Card title={"Product Form"} bordered style={{ width: 350 }}>
//             <form onSubmit={formMik.handleSubmit}>
//                 <div>
//                     <Typography.Paragraph>{'Product Name'}</Typography.Paragraph>
//                     <Input name={'name'}
//                         value={formMik.values.name} 
//                         onChange={formMik.handleChange('name')}
//                         status={formMik.errors.name && 'error'}
//                     />
//                     {formMik.errors.name && (
//                         <Typography.Paragraph>{formMik.errors.name}</Typography.Paragraph>
//                     )}
//                 </div>
//                 <div>
//                     <Typography.Paragraph>{'Product Status'}</Typography.Paragraph>
//                     <Select 
//                         // name={'status'}
//                         value={formMik.values.is_active} 
//                         onChange={(value) => formMik.setFieldValue('is_active', value)}
//                         status={formMik.errors.is_active ? 'error' : undefined}
//                     >
//                         {statusOptions.map((option) => (
//                             <Select.Option key={String(option.value)} value={option.value}>
//                                 {option.label}
//                             </Select.Option>
//                         ))}
//                     </Select>

//                     {formMik.errors.is_active && (
//                         <Typography.Paragraph style={{ color: "red" }}>{formMik.errors.is_active}</Typography.Paragraph>
//                     )}
//                 </div>
//                 <Button type={'primary'} htmlType={"submit"}>Submit</Button>
//             </form>
//         </Card>
//     )
// }

// export default CategoryForm