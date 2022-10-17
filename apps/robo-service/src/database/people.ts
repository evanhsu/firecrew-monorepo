import { PersonModel } from './db';

export let person01 = {
  id: 'person-1-uuid',
  name: 'Albert Einstein',
  groupId: 'group-1-uuid',
};
export let person02 = {
  id: 'person-2-uuid',
  name: 'Billy Idol',
  groupId: 'group-1-uuid',
};
export let person03 = {
  id: 'person-3-uuid',
  name: 'Charlie Chaplin',
  groupId: 'group-1-uuid',
};
export let person04 = {
  id: 'person-4-uuid',
  name: 'David Bowie',
  groupId: 'group-1-uuid',
};
export let person05 = {
  id: 'person-5-uuid',
  name: 'Ewan McGregor',
  groupId: 'group-1-uuid',
};
export let person06 = {
  id: 'person-6-uuid',
  name: 'Fox McCloud',
  groupId: 'group-1-uuid',
};
export let person07 = {
  id: 'person-7-uuid',
  name: 'Gravy Train',
  groupId: 'group-1-uuid',
};
export let person08 = {
  id: 'person-8-uuid',
  name: 'Helen Hunt',
  groupId: 'group-1-uuid',
};
export let person09 = {
  id: 'person-9-uuid',
  name: 'Iovko Margaritov',
  groupId: 'group-1-uuid',
};
export let people: Record<string, PersonModel> = {
  [person01.id]: person01,
  [person02.id]: person02,
  [person03.id]: person03,
  [person04.id]: person04,
  [person05.id]: person05,
  [person06.id]: person06,
  [person07.id]: person07,
  [person08.id]: person08,
  [person09.id]: person09,
};
