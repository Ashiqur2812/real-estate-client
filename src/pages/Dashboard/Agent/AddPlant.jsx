import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPropertyForm'

const AddPlant = () => {
  return (
    <div>
      <Helmet>
        <title>Add Property | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm />
    </div>
  )
}

export default AddPlant
