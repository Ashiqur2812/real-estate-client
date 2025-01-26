import { Helmet } from 'react-helmet-async';
import AddPlantForm from '../../../components/Form/AddPlantForm';
import { imageUpload } from '../../../components/api/utils';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddPlant = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState({ image: { name: 'Upload Image' } });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const minPrice = parseFloat(form.minPrice.value);
    const maxPrice = parseFloat(form.maxPrice.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // agent info
    const agent = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email
    };

    const propertyData = { title, location, minPrice, maxPrice, image: imageUrl, agent };

    console.table({ propertyData });

    try {
      const { data } = await axiosSecure.post('/property', propertyData);
      console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Property Added Successfully!!!",
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: `${error?.message}`,
        icon: "error",
        draggable: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Property | Dashboard</title>
      </Helmet>
      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadButtonText={uploadButtonText}
        setUploadButtonText={setUploadButtonText}
        loading={loading} />
    </div>
  );
};

export default AddPlant;
