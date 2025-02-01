import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../api/utils";

const UpdatePlantForm = () => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const reviewerName = form.reviewerName.value;
    const reviewerEmail = form.reviewerEmail.value;
    const reviewDescription = form.reviewDescription.value;
    const propertyTitle = form.propertyTitle.value;
    const reviewerImage = form.image.files[0];
    const image = await imageUpload(reviewerImage);

    const reviewerData = { reviewerName, reviewerEmail, reviewerImage: image, reviewDescription, propertyTitle , };

    // console.table({ reviewerData });

    try {
      const { data } = await axiosSecure.post('/reviewer', reviewerData);
      // console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review Added Successfully!!!",
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      // console.log(error);
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
                className='w-full px-4 py-3 text-gray-800 border border-pink-300 focus:outline-pink-500 rounded-md bg-white'
                name='reviewerName'
                id='reviewerName'
                type='text'
                placeholder='Enter Your Name'
                required
              />
            </div>
            {/* Email */}
            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600'>
                Email
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-pink-300 focus:outline-pink-500 rounded-md bg-white'
                name='reviewerEmail'
                id='reviewerEmail'
                type='email'
                placeholder='Enter Your Email'
                required
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600'>
                Title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-pink-300 focus:outline-pink-500 rounded-md bg-white'
                name='propertyTitle'
                id='propertyTitle'
                type='text'
                placeholder='Enter Property Title'
                required
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600'>
                Description
              </label>
              <textarea
                id='description'
                placeholder='Write review description here...'
                className='block rounded-md focus:pink-300 w-full h-32 px-4 py-3 text-gray-800  border border-pink-300 bg-white focus:outline-pink-500 '
                name='reviewDescription'
              ></textarea>
            </div>
          </div>
          <div className='space-y-6 flex flex-col'>
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
                    <div className='bg-pink-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-pink-500'>
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-pink-500 '
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
