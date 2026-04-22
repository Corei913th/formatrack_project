import { School } from "lucide-react"



type FormHeaderProps = {
  message: string
  title: string
}

const FormHeader = ({ message, title }: FormHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-transparent rounded-2xl shadow-none mb-4">
        <div className="w-17 h-17 bg-transparent rounded-(--radius) flex items-center justify-center ">
          <School className="h-8 w-8" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-warning mb-2">
        {title} !
      </h1>
      <p className="text-gray-600">
        {message}
      </p>
    </div>
  )
}

export default FormHeader
