import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../api/utils";

const UpdatePlantForm = () => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const reviewerName = form.reviewerName.value;
    const reviewDescription = form.reviewDescription.value;
    const propertyTitle = form.propertyTitle.value;
    const reviewerImage = form.image.files[0];
    const image = await imageUpload(reviewerImage);

    const reviewerData = { reviewerName, reviewerImage: image, reviewDescription, propertyTitle , };

    console.table({ reviewerData });

    try {
      const { data } = await axiosSecure.post('/reviewer', reviewerData);
      console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review Added Successfully!!!",
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
    }

  };

  return (
    <div className='w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600'>
                Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='reviewerName'
                id='reviewerName'
                type='text'
                placeholder='Enter Your Name'
                required
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600'>
                Title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='propertyTitle'
                id='propertyTitle'
                type='text'
                placeholder='Enter Property Title'
                required
              />
            </div>
            {/* Category */}
            {/* <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600 '>
                Category
              </label>
              <select
                required
                className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='category'
              >
                <option value='Indoor'>Indoor</option>
                <option value='Outdoor'>Outdoor</option>
                <option value='Succulent'>Succulent</option>
                <option value='Flowering'>Flowering</option>
              </select>
            </div> */}
            {/* Description */}
            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600'>
                Description
              </label>
              <textarea
                id='description'
                placeholder='Write review description here...'
                className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
                name='reviewDescription'
              ></textarea>
            </div>
          </div>
          <div className='space-y-6 flex flex-col'>
            {/* Price & Quantity */}
            {/* <div className='flex justify-between gap-2'> */}
            {/* Price */}
            {/* <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600 '>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price per unit'
                  required
                />
              </div> */}

            {/* Quantity */}
            {/* <div className='space-y-1 text-sm'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Quantity
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  required
                />
              </div> */}
            {/* </div> */}
            {/* Image */}
            <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='reviewerImage'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
            >
              Add review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlantForm;
