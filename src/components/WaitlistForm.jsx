import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { site } from '../config/site.js';

const orgTypes = [
  'Company or corporate',
  'NGO or conservation organisation',
  'Forest or restoration partner',
  'County government or public institution',
  'Development partner or programme',
  'Research or academic institution',
  'Other',
];

const interests = [
  'Forest health monitoring',
  'Restoration tracking and visibility',
  'ESG and sustainability reporting',
  'Geospatial insights',
  'Partnership or collaboration',
  'Other',
];

const empty = {
  name: '',
  email: '',
  organisation: '',
  role: '',
  orgType: '',
  interest: '',
  goals: '',
  consent: false,
};

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your full name.';
  if (!v.email.trim()) e.email = 'Enter your work email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter an email like name@organisation.org.';
  if (!v.organisation.trim()) e.organisation = 'Enter your organisation.';
  if (!v.role.trim()) e.role = 'Enter your role or designation.';
  if (!v.orgType) e.orgType = 'Choose an organisation type.';
  if (!v.interest) e.interest = 'Choose an area of interest.';
  if (v.goals.trim().length < 10) e.goals = 'Tell us a little more (at least 10 characters).';
  if (!v.consent) e.consent = 'Tick the box so we can contact you about JuaMsitu.';
  return e;
}

/**
 * Waitlist registration.
 * - With site.waitlistEndpoint set (e.g. Formspree), submissions are sent there
 *   and success is shown only after the service confirms receipt.
 * - Without it, nothing is sent and the form says so plainly,
 *   offering a pre-filled email instead.
 */
export default function WaitlistForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | not-connected | error

  const update = (field) => (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const mailtoHref = () => {
    const body = [
      `Full name: ${values.name}`,
      `Work email: ${values.email}`,
      `Organisation: ${values.organisation}`,
      `Role: ${values.role}`,
      `Organisation type: ${values.orgType}`,
      `Area of interest: ${values.interest}`,
      '',
      'What we would like to achieve with JuaMsitu:',
      values.goals,
    ].join('\n');
    return `mailto:${site.email}?subject=${encodeURIComponent('JuaMsitu waitlist')}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first field with a problem
      const first = Object.keys(found)[0];
      document.getElementById(`wl-${first}`)?.focus();
      return;
    }

    if (!site.waitlistEndpoint) {
      setState('not-connected');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(site.waitlistEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setState('sent');
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="form">
        <div className="notice notice--success" role="status">
          <CheckCircle2 aria-hidden="true" />
          <div>
            <p><strong>You're on the waitlist.</strong></p>
            <p>We'll contact you at {values.email} as JuaMsitu opens to organisations.</p>
          </div>
        </div>
      </div>
    );
  }

  const field = (name, label, input, full = false) => (
    <div className={`field ${full ? 'field--full' : ''} ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={`wl-${name}`}>{label}</label>
      {input}
      {errors[name] && <span className="field__error" id={`wl-${name}-error`}>{errors[name]}</span>}
    </div>
  );

  const aria = (name) => ({
    id: `wl-${name}`,
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `wl-${name}-error` : undefined,
  });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        {field('name', 'Full name', <input {...aria('name')} type="text" autoComplete="name" value={values.name} onChange={update('name')} />)}
        {field('email', 'Work email', <input {...aria('email')} type="email" autoComplete="email" placeholder="name@organisation.org" value={values.email} onChange={update('email')} />)}
        {field('organisation', 'Organisation', <input {...aria('organisation')} type="text" autoComplete="organization" value={values.organisation} onChange={update('organisation')} />)}
        {field('role', 'Role or designation', <input {...aria('role')} type="text" autoComplete="organization-title" placeholder="Sustainability lead" value={values.role} onChange={update('role')} />)}
        {field('orgType', 'Organisation type', (
          <select {...aria('orgType')} value={values.orgType} onChange={update('orgType')}>
            <option value="">Choose one</option>
            {orgTypes.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
        {field('interest', 'Area of interest', (
          <select {...aria('interest')} value={values.interest} onChange={update('interest')}>
            <option value="">Choose one</option>
            {interests.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
        {field('goals', 'What would you like to achieve with JuaMsitu?', (
          <textarea {...aria('goals')} placeholder="For example, tracking vegetation health across restoration sites we support" value={values.goals} onChange={update('goals')} />
        ), true)}
      </div>

      <label className="consent">
        <input id="wl-consent" type="checkbox" checked={values.consent} onChange={update('consent')} aria-invalid={!!errors.consent} />
        <span>I agree that JuaMsitu may store these details and contact me about the platform and the waitlist.</span>
      </label>
      {errors.consent && <span className="field__error">{errors.consent}</span>}

      <p className="form__privacy">
        We only use your details to manage the waitlist and follow up about JuaMsitu. We don't sell or share
        them. You can ask us to delete them at any time by emailing {site.email}. Read our{' '}
        <Link to="/privacy">privacy policy</Link>.
      </p>

      <button type="submit" className="btn btn--teal" disabled={state === 'sending'}>
        {state === 'sending' ? <><Loader2 className="spin" aria-hidden="true" /> Joining…</> : 'Join the waitlist'}
      </button>

      {state === 'not-connected' && (
        <div className="notice notice--warn" role="alert">
          <AlertTriangle aria-hidden="true" />
          <div>
            <p><strong>Your details have not been sent.</strong> The waitlist form isn't connected to a service yet.</p>
            <p>Send them by email instead: <a href={mailtoHref()}>email your details to {site.email}</a>.</p>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="notice notice--error" role="alert">
          <XCircle aria-hidden="true" />
          <div>
            <p><strong>Your details couldn't be sent.</strong> Check your connection and try again.</p>
            <p>Or <a href={mailtoHref()}>email your details to {site.email}</a>.</p>
          </div>
        </div>
      )}
    </form>
  );
}
