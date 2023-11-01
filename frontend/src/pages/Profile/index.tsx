import { useEffect, useMemo } from 'react';
import { ContactList } from 'src/components/ContactsList';
import { MainContainer } from 'src/components/Container/Main';
import { Skeleton } from 'src/components/Skeleton';
import { useUser } from 'src/hooks/useUser';
import { handleProfilePdf } from 'utils/profile.pdf';
import { phoneReplaceRegex } from 'utils/string.utils';

export const Profile = () => {
  const { profile, userService } = useUser();
  const info = useMemo(() => ({ ...profile, phone: profile?.phone.replace(...phoneReplaceRegex) }), [profile]);

  const { retrieve } = userService;

  useEffect(() => {
    (async () => await retrieve())();
  }, [retrieve]);

  return (
    <MainContainer>
      <div className='tw-authenticated-main-child user-info-container flex shrink-0 grow-0 basis-auto flex-col'>
        <div className='tw-authenticated-main-child__content flex flex-col gap-[16px] px-[16px] pb-[16px]'>
          {info && <h3 className='text-18-600 truncate text-center capitalize text-grey-800 underline'>{info.full_name}</h3>}
          {!profile && <Skeleton />}
          <div className='flex flex-col gap-[16px] md:flex-row md:items-center md:justify-between '>
            <div className='flex w-full flex-col gap-[12px] text-grey-700'>
              <p className={`text-14-700 ${profile ? '' : 'inline-flex'}`.trim()}>
                Email: {info && <span className='text-14-400 truncate pl-[16px] text-grey-600'>{info.email}</span>}
                {!profile && <Skeleton />}
              </p>
              <p className={`text-14-700 ${profile ? '' : 'inline-flex'}`.trim()}>
                Telefone: {info && <span className='text-14-400 truncate pl-[16px] text-grey-600'>{info.phone}</span>}
                {!profile && <Skeleton />}
              </p>
            </div>

            <button
              onClick={() => handleProfilePdf(profile!)}
              className='text-14-700 w-full rounded-[8px] border border-brand-neutral py-[6px] text-center text-brand-300 md:min-w-fit md:max-w-[120px] md:px-[26px]'
            >
              Exportar dados
            </button>
          </div>
        </div>
      </div>
      <ContactList view />
    </MainContainer>
  );
};
