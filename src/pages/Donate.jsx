import { useState } from 'react';
import { Copy, Check, HandHeart } from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import { site, images } from '../config/site.js';
import './pages.css';

const formatKsh = (n) => `KSh ${Number(n).toLocaleString('en-KE')}`;

/** Copy text, with a fallback for older browsers and non-HTTPS previews. */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

export default function Donate() {
  const { till, method, suggestedAmounts } = site.mpesa;
  const [copied, setCopied] = useState(null); // null | 'ok' | 'fail'
  const [selected, setSelected] = useState(500);
  const [other, setOther] = useState('');

  const amount = selected === 'other' ? (Number(other) > 0 ? Number(other) : null) : selected;

  const onCopy = async () => {
    const ok = await copyText(till);
    setCopied(ok ? 'ok' : 'fail');
    setTimeout(() => setCopied(null), 3000);
  };

  return (
    <Page>
      <Seo
        title="Donate"
        description="Support forest restoration in Kenya. Donate through M-Pesa Buy Goods, Till Number 4200294, to a restoration project run by one of JuaMsitu's restoration partners."
      />

      <PageHero
        image={images.landscape}
        title="Help forests thrive. Be part of the restoration journey."
        lead="Every forest has a story worth protecting. Your contribution can help support restoration efforts and the people working on the ground to bring degraded landscapes back to life."
      >
        <div className="donate-promise">
          <HandHeart aria-hidden="true" />
          <p>Your donation goes directly towards supporting a restoration project implemented by one of our restoration partners.</p>
        </div>
      </PageHero>

      {/* M-Pesa */}
      <section className="section" id="give">
        <div className="container">
          <div className="section-head">
            <h2>Give through M-Pesa</h2>
            <p className="lead">It takes about a minute on your phone. Choose an amount, then follow the steps.</p>
          </div>

          <div className="mpesa">
            <div className="till-card">
              <span className="till-card__method">Payment method: {method}</span>
              <p className="till-card__label">Till number</p>
              <p className="till-card__number">{till}</p>

              <button type="button" className="btn btn--sun" onClick={onCopy}>
                {copied === 'ok' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copied === 'ok' ? 'Till number copied' : 'Copy till number'}
              </button>
              <span className="copy-status" role="status" aria-live="polite">
                {copied === 'fail' && `Copy didn't work here. The till number is ${till}.`}
              </span>

              <p className="amounts-label" id="amount-label">Suggested contribution</p>
              <div className="amounts" role="group" aria-labelledby="amount-label">
                {suggestedAmounts.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`amount ${selected === a ? 'is-selected' : ''}`}
                    aria-pressed={selected === a}
                    onClick={() => setSelected(a)}
                  >
                    {formatKsh(a)}
                  </button>
                ))}
                <button
                  type="button"
                  className={`amount ${selected === 'other' ? 'is-selected' : ''}`}
                  aria-pressed={selected === 'other'}
                  onClick={() => setSelected('other')}
                >
                  Other amount
                </button>
              </div>

              {selected === 'other' && (
                <div className="other-amount">
                  <label htmlFor="other-amount"><span>KSh</span></label>
                  <input
                    id="other-amount"
                    type="number"
                    inputMode="numeric"
                    min="10"
                    step="10"
                    placeholder="Amount"
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </div>

            <div>
              <ol className="instructions">
                <li><span>Open M-Pesa on your phone.</span></li>
                <li><span>Select <strong>Lipa na M-Pesa</strong>.</span></li>
                <li><span>Select <strong>Buy Goods and Services</strong>.</span></li>
                <li><span>Enter Till Number: <strong>{till}</strong>.</span></li>
                <li><span>
                  Enter the amount you wish to contribute
                  {amount ? <>, for example <strong>{formatKsh(amount)}</strong></> : null}.
                </span></li>
                <li><span>Confirm the payment details before completing the transaction.</span></li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Bigger picture */}
      <section className="section section--mist">
        <div className="container split">
          <div>
            <h2>Every contribution is part of something bigger.</h2>
          </div>
          <div className="prose">
            <p className="lead">
              Restoration takes patience, local knowledge and steady support. Contributions made here go
              to restoration work carried out through JuaMsitu's restoration partners, the people and
              organisations caring for degraded landscapes on the ground.
            </p>
            <p>
              Whatever the size of your gift, it joins others to help keep that work going. As our
              partnerships grow, we'll share updates on the projects your contributions support.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container closing">
          <p>Thank you for believing in a future where forests can thrive and communities can flourish.</p>
        </div>
      </section>
    </Page>
  );
}
