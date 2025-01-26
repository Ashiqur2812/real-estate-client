import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '../Shared/Button/Button';
import useAuth from '../../hooks/useAuth';
import UpdatePlantForm from '../Form/UpdatePlantForm';

const PurchaseModal = ({ closeModal, isOpen, reviews }) => {

  const { reviewerName, reviewerImage, reviewDescription, propertyTitle } = reviews || {};
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Purchase
                </DialogTitle>
                <UpdatePlantForm />
                {/* <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Property: {propertyTitle}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Location: {reviewDescription}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>User: {reviewerName}</p>
                </div> */}

                {/* <div className='mt-2 mb-3'>
                  <p className='text-sm text-gray-500'>Price: {minPrice}$ - {maxPrice}$</p>
                </div> */}
                {/* <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity: 5</p>
                </div> */}
                {/* <Button label='Give your opinion' /> */}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
