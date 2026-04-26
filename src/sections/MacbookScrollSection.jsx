import { MacbookScroll } from '@/components/ui/macbook-scroll';

export default function MacbookScrollSection() {
  return (
    <div className="w-full overflow-hidden bg-krypt-charcoal">
      <MacbookScroll
        title={
          <span className="text-white font-playfair font-black">
            Built to <span className="text-krypt-orange italic">Perform</span>
            <br />
            <span className="text-lg font-dm font-normal text-white/50">
              High-converting digital products, delivered.
            </span>
          </span>
        }
        src="/herohorizontal/46d06c94bfc3fd977a1cf86cbc56f81c_720w.mp4"
        showGradient={false}
      />
    </div>
  );
}
