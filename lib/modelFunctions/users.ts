import {Schema} from "mongoose";
import {dbConnect} from "@lib/database";
import type {CUUsers, Notification, NotificationType, UsersInterface} from "@components/interface";
import {Users} from "@models";


// eslint-disable-next-line @typescript-eslint/no-explicit-any -- create returns any
export async function createUser(data: CUUsers, isStaff?: boolean, isSignedUp?: boolean): Promise<any> {
  await dbConnect();
  const randomNumber = Math.floor(Math.random() * 25);
  return Users.create<UsersInterface>({
    ...data,
    isStaff,
    isSignedUp,
    picture: data.picture || `/images/avatars/avatar_${randomNumber}.jpg`
  })
}

export async function getUser(email: string): Promise<UsersInterface | null> {
  await dbConnect();
  return Users.findOne<UsersInterface>({email}).where('deletedAt').equals(undefined)
    .then((res) => JSON.parse(JSON.stringify(res)) as UsersInterface | null)
    .catch(() => null);

}

export async function getAllStudents(): Promise<UsersInterface[]> {
  await dbConnect();
  return Users.find<UsersInterface>({isStaff: false}).where('deletedAt').equals(undefined)
    .then((res) => JSON.parse(JSON.stringify(res)) as UsersInterface[])
    .catch(() => []);
}

export async function modifyUser(id: string, update: CUUsers): Promise<UsersInterface | null> {
  await dbConnect();
  return Users.findByIdAndUpdate<UsersInterface>(id, update as UsersInterface)
}

export async function deleteUser(id: string, userId: string): Promise<UsersInterface | null> {
  await dbConnect();
  return Users.findByIdAndUpdate<UsersInterface | null>(id, {
    deletedAt: Date.now(), deletedBy: new Schema.Types.ObjectId(userId)
  });
}

export async function addNotification(
  _id: string,
  title: string,
  type: NotificationType,
  icon?: string,
): Promise<UsersInterface | null> {
  await dbConnect();
  const notification: Notification = {
    icon,
    title,
    createdAt: new Date,
    isUnRead: false,
    type,
    action: "Pending"
  }
  return Users.findByIdAndUpdate<UsersInterface>(_id, notification)
}
