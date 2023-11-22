import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {customStorage} from './CustomStorage';
const Store = set => ({
  name: 'suhail',
  token: '',
  serialNumber: 0,
  email: '',
  phoneNumber: '',
  userName: '',
  setSerialNumber: serialNumber => set({serialNumber}),
  setUserName: name => set({name}),
  setName: name => set({name}),
  setEmail: email => set({email}),
  setPhoneNumber: phoneNumber => set({phoneNumber}),
  setToken: token => set({token}),
  userDetails: {},
  setUserDetails: userDetails => set({userDetails: userDetails}),
});
const useStateStore = create(
  devtools(
    persist(Store, {
      name: 'userInfo',
      storage: createJSONStorage(() => customStorage),
    }),
  ),
);
export default useStateStore;
