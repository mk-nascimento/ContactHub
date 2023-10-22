import { useEffect } from 'react';
import { ContactList } from 'src/components/ContactsList';
import { MainContainer } from 'src/components/Container/Main';
import { useUser } from 'src/hooks/useUser';
import { phoneReplaceRegex } from 'utils/string.utils';

export const Profile = () => {
  const {
    data: { profile: profileData },
    userService: { profile: profileFn },
  } = useUser();

  useEffect(() => {
    (async () => await profileFn())();
  }, [profileFn]);

  return (
    <MainContainer>
      <div className='tw-authenticated-page-main-child user-info-container flex h-fit w-full flex-col'>
        <div className='tw-authenticated-page-main-child__content flex flex-col gap-[16px] px-[16px] pb-[16px]'>
          <h3 className='text-18-600 truncate text-center capitalize text-grey-800 underline'>
            {profileData?.full_name ?? 'user full name'}
          </h3>
          <div className='flex flex-col gap-[16px] md:flex-row md:items-center md:justify-between '>
            <div className='flex flex-col gap-[12px] text-grey-700'>
              <p className='text-14-700'>
                Email:
                <span className='text-14-400 truncate pl-[16px] text-grey-600'>{profileData?.email ?? "'mail@mail.com'"}</span>
              </p>
              <p className='text-14-700'>
                Telefone:
                <span className='text-14-400 truncate pl-[16px] text-grey-600'>
                  {profileData?.phone.replace(...phoneReplaceRegex) ?? '(**) *****-****'}
                </span>
              </p>
            </div>

            <button className='text-14-700 w-full rounded-[8px] border border-brand-neutral py-[6px] text-center text-brand-300 md:w-fit md:px-[26px]'>
              Exportar dados
            </button>
          </div>
        </div>
      </div>
      <ContactList view />
    </MainContainer>
  );
};
