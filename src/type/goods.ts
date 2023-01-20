export interface Goodable {
  userId: number
  id: number
  title: string
  introduce: string
}
interface selectFormable {
  title: string
  introduce: string
  page: number
  count: number
  pagesize: number
}
export class InitGoodData {
  selectForm: selectFormable = {
    title: '',
    introduce: '',
    page: 1,
    count: 0,
    pagesize: 8,
  }
  goods: Goodable[] = []
}
