self.addEventListener('push', event => {
    const data = event.data.json()
    console.log('New notification', data)
    const options = {
      body: data.body,
    }
    event.waitUntil(
      self.registration.showNotification(data.title, options)      
    );

    self.addEventListener('notificationclick', function (event) {
      event.notification.close();
      clients.openWindow("http://localhost:3000/#/order");
    });
  })
