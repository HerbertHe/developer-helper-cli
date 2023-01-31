export const asyncTask = (task: () => void) => {
    return new Promise((resolve) => {
        task()
        resolve(null)
    })
}