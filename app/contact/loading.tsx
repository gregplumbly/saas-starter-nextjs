import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContactLoading() {
  return (
    <Container className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-full mx-auto" />
          <Skeleton className="h-6 w-5/6 mx-auto mt-2" />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-5 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            <div>
              <Skeleton className="h-5 w-20 mb-2" />
              <Skeleton className="h-32 w-full" />
            </div>
            
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-lg bg-gray-50">
              <Skeleton className="h-6 w-24 mx-auto mb-2" />
              <Skeleton className="h-5 w-32 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
