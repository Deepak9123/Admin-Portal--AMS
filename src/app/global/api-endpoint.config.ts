import { decryptData } from '../../environments/encryption-util';
import { environment } from '../global/api-url.config';
const _apiUrl = decryptData(environment.api_baseurl);
export const apiEndPoint = {
 createAccount:_apiUrl+'createAccount',
 getAccount:_apiUrl+'getAccountList',
 createProject:_apiUrl+'createProject',
 getProject:_apiUrl+'getProjectList',
 userCreation:_apiUrl+"userManagement/createUser",
 validateUser:_apiUrl+"userManagement/userValidate"
  
};
