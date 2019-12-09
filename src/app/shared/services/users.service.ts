import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/users.model";
import {map} from "rxjs/operators";
import {BaseApi} from "../../system/shared/core/base-api";

@Injectable()
export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http)
  }

  // getUserByEmail(email: string): Observable<User> {
  //   return this.http.get(`http://localhost:3000/users?email=${email}`)
  //     .pipe(map((response: any) => response))
  //     .pipe(map((user: User[]) => user[0] ? user[0]: undefined))
  // }
  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .pipe(map((user: User[]) => user[0] ? user[0]: undefined))
  }

  // createNewUser(user: User): Observable<User> {
  //   return this.http.post('http://localhost:3000/users', user)
  //     .pipe(map((response: any) => response))
  // }
  createNewUser(user: User): Observable<User> {
    return this.post('users', user)
  }
}
