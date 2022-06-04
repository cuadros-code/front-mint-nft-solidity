
const upload = () => {

  const handleChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const result = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });


    fetch('/api/upload', {
      method: 'POST',
      body: result
    }).then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))

  }
  
  return (
    <div className="header-container">
      <input
        onChange={handleChange}
        type="file"
      />
    </div>
  )
}

export default upload