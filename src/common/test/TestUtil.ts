import { User } from '../../user/user.entity';

export default class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();
    user.email = 'test@example.com';
    user.name = 'teste name';
    user.id = '1';

    return user;
  }
}
