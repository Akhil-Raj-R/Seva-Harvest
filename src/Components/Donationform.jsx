
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Donationform.css';

function Donationform() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    foodName: '',
    foodType: 'Cooked Food',
    quantity: '',
    pickupDate: '',
    pickupTime: '',
    pickupAddress: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Step 1: Get the currently logged-in donor
    let loggedInDonor = null;

    try {
      loggedInDonor = JSON.parse(
        localStorage.getItem('loggedInDonor')
      );
    } catch {
      loggedInDonor = null;
    }

    // Step 2: Check whether a donor is logged in
    if (!loggedInDonor?.email) {
      alert('Please log in as a donor before submitting a donation.');
      navigate('/login');
      return;
    }

    // Step 3: Create a donation with the donor's email
    const newDonation = {
      ...formData,
      id: Date.now(),
      donorEmail: loggedInDonor.email.trim().toLowerCase(),
      status: 'Pending',
    };

    // Step 4: Get existing donations
    let existingDonations = [];

    try {
      existingDonations = JSON.parse(
        localStorage.getItem('foodDonations') || '[]'
      );

      if (!Array.isArray(existingDonations)) {
        existingDonations = [];
      }
    } catch {
      existingDonations = [];
    }

    // Step 5: Add the new donation
    existingDonations.push(newDonation);

    // Step 6: Save all donations
    localStorage.setItem(
      'foodDonations',
      JSON.stringify(existingDonations)
    );

    // Step 7: Show the success page
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="donate-new-page">
        <header className="dn-navbar">
          <Link to="/home" className="dn-logo">
            🌱 Seva<span>Harvest</span>
          </Link>
        </header>

        <section className="dn-success">
          <div className="dn-success-icon">✓</div>

          <p className="dn-eyebrow">KINDNESS IN ACTION</p>

          <h1>Thank you for donating!</h1>

          <p>
            Your food donation has been submitted successfully.
            Thank you for helping your community through SevaHarvest.
          </p>

          <div className="dn-success-actions">
            <button
              className="dn-submit"
              onClick={() => navigate('/dashboard')}
            >
              View My Donations →
            </button>

            <Link to="/home" className="dn-back-link">
              Back to Home
            </Link>
          </div>
        </section>

        <footer className="dn-footer">
          🌱 SevaHarvest — Share Food • Spread Hope.
        </footer>
      </div>
    );
  }

  return (
    <div className="donate-new-page">
      {/* Navigation */}
      <header className="dn-navbar">
        <Link to="/home" className="dn-logo">
          🌱 Seva<span>Harvest</span>
        </Link>

        <div className="dn-nav-actions">
          <Link to="/home" className="dn-back-link">
            ← Back to Home
          </Link>

          <Link to="/dashboard" className="dn-dashboard-link">
            My Donations
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="dn-main">
        <section className="dn-intro">
          <span className="dn-eyebrow">
            SHARE FOOD • SPREAD HOPE
          </span>

          <h1>
            Share food. <span>Spread hope.</span>
          </h1>

          <p>
            Welcome to SevaHarvest! Your extra food can become
            someone else's meaningful meal. Complete the form
            below to start your donation.
          </p>
        </section>

        <div className="dn-layout">
          {/* Photo and information */}
          <aside className="dn-sidebar">
            <div className="dn-photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85"
                alt="Community volunteers supporting food donation"
                className="dn-photo"
              />

              <div className="dn-photo-overlay">
                <span>💚</span>

                <div>
                  <strong>A meal can make a difference</strong>
                  <p>Share what you can, when you can.</p>
                </div>
              </div>
            </div>

            <div className="dn-info-card">
              <h3>Before you donate</h3>

              <div className="dn-info-item">
                <span>01</span>
                <p>
                  Make sure your food is fresh and safe to eat.
                </p>
              </div>

              <div className="dn-info-item">
                <span>02</span>
                <p>
                  Provide an accurate pickup address and time.
                </p>
              </div>
            </div>
          </aside>

          {/* Donation form */}
          <section className="dn-form-card">
            <div className="dn-form-heading">
              <div>
                <span className="dn-eyebrow">
                  YOUR CONTRIBUTION
                </span>

                <h2>Donation Details</h2>

                <p>
                  Tell us a little about the food you're sharing.
                </p>
              </div>

              <span className="dn-form-emoji">🍱</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="dn-form-grid">
                <div className="dn-field">
                  <label htmlFor="dn-name">Your Name *</label>

                  <input
                    id="dn-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="dn-field">
                  <label htmlFor="dn-phone">Phone Number *</label>

                  <input
                    id="dn-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter contact number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="dn-field">
                  <label htmlFor="dn-foodName">Food Name *</label>

                  <input
                    id="dn-foodName"
                    name="foodName"
                    type="text"
                    placeholder="e.g. Rice and curry"
                    value={formData.foodName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="dn-field">
                  <label htmlFor="dn-foodType">Food Type *</label>

                  <select
                    id="dn-foodType"
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Cooked Food">Cooked Food</option>
                    <option value="Fresh Vegetables">
                      Fresh Vegetables
                    </option>
                    <option value="Fruits">Fruits</option>
                    <option value="Packaged Food">Packaged Food</option>
                    <option value="Bakery Items">Bakery Items</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="dn-field">
                  <label htmlFor="dn-quantity">Quantity *</label>

                  <input
                    id="dn-quantity"
                    name="quantity"
                    type="text"
                    placeholder="e.g. 10 meal portions"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="dn-field">
                  <label htmlFor="dn-pickupDate">Pickup Date *</label>

                  <input
                    id="dn-pickupDate"
                    name="pickupDate"
                    type="date"
                    min={new Date().toLocaleDateString('en-CA')}
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="dn-field">
                  <label htmlFor="dn-pickupTime">Pickup Time *</label>

                  <input
                    id="dn-pickupTime"
                    name="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="dn-field dn-full">
                  <label htmlFor="dn-pickupAddress">
                    Pickup Address *
                  </label>

                  <textarea
                    id="dn-pickupAddress"
                    name="pickupAddress"
                    placeholder="Enter the complete food collection address"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="dn-field dn-full">
                  <label htmlFor="dn-notes">
                    Additional Notes
                  </label>

                  <textarea
                    id="dn-notes"
                    name="notes"
                    placeholder="Add any extra information"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
              </div>

              <div className="dn-safety-note">
                <span>🛡️</span>

                <p>
                  Please donate food that has been handled safely.
                  Include relevant allergen and storage information.
                </p>
              </div>

              <button type="submit" className="dn-submit">
                Submit Food Donation <span>→</span>
              </button>

              <p className="dn-required-note">
                * Required fields
              </p>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="dn-footer">
        🌱 SevaHarvest — Reducing food waste, sharing hope.
      </footer>
    </div>
  );
}

export default Donationform;
